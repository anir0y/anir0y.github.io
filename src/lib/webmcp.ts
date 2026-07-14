import { LINKS } from "../data/links";
import { NAV } from "../data/nav";
import { PROJECTS } from "../data/projects";
import { RESEARCH } from "../data/research";
import { SERVICES } from "../data/services";
import { COURSES } from "../data/training";

type JsonObject = Record<string, unknown>;

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: JsonObject;
  execute: (input: unknown) => unknown | Promise<unknown>;
}

type RegistrationResult = void | (() => void) | { dispose?: () => void; unregister?: () => void };

interface ModelContext {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => RegistrationResult;
  provideContext?: (
    context: { name: string; description: string; tools: WebMcpTool[] },
    options?: { signal?: AbortSignal },
  ) => RegistrationResult;
}

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const sectionIds = NAV.map((item) => item.id);

function asRecord(input: unknown): JsonObject {
  return input && typeof input === "object" ? (input as JsonObject) : {};
}

function textValue(input: unknown, key: string): string {
  const value = asRecord(input)[key];
  return typeof value === "string" ? value : "";
}

function rememberDisposer(result: RegistrationResult, disposers: Array<() => void>) {
  if (typeof result === "function") {
    disposers.push(result);
  } else if (result?.dispose) {
    disposers.push(() => result.dispose?.());
  } else if (result?.unregister) {
    disposers.push(() => result.unregister?.());
  }
}

function searchSite(query: string) {
  const needle = query.trim().toLowerCase();
  const rows = [
    ...NAV.map((item) => ({
      type: "section",
      title: item.label,
      url: `/#${item.id}`,
      text: item.id,
    })),
    ...SERVICES.map((item) => ({
      type: "service",
      title: item.title,
      url: "/#services",
      text: `${item.desc} ${item.tags.join(" ")}`,
    })),
    ...COURSES.map((item) => ({
      type: "training",
      title: item.name,
      url: "/#training",
      text: `${item.desc} ${item.tags.join(" ")}`,
    })),
    ...RESEARCH.map((item) => ({
      type: "research",
      title: item.title,
      url: item.href || "/#research",
      text: `${item.meta} ${item.desc}`,
    })),
    ...PROJECTS.map((item) => ({
      type: "project",
      title: item.title,
      url: item.href,
      text: `${item.ix} ${item.desc}`,
    })),
  ];

  if (!needle) return rows.slice(0, 10);

  return rows
    .filter((row) => `${row.type} ${row.title} ${row.text}`.toLowerCase().includes(needle))
    .slice(0, 10);
}

function buildTools(): WebMcpTool[] {
  return [
    {
      name: "site_search",
      description: "Search public sections, services, training, research, and projects on anir0y.in.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query." },
        },
        required: ["query"],
        additionalProperties: false,
      },
      execute(input) {
        return { results: searchSite(textValue(input, "query")) };
      },
    },
    {
      name: "open_section",
      description: "Scroll the current page to a public section.",
      inputSchema: {
        type: "object",
        properties: {
          section: { type: "string", enum: sectionIds },
        },
        required: ["section"],
        additionalProperties: false,
      },
      execute(input) {
        const section = textValue(input, "section");
        if (!sectionIds.includes(section)) {
          return { ok: false, error: "unknown_section", sections: sectionIds };
        }

        const element = document.getElementById(section);
        if (!element) {
          window.location.hash = section;
          return { ok: true, navigated: false, hash: `#${section}` };
        }

        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return { ok: true, navigated: true, hash: `#${section}` };
      },
    },
    {
      name: "get_contact_links",
      description: "Return public contact and profile links for anir0y.in.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute() {
        return { links: LINKS };
      },
    },
  ];
}

export function registerWebMcpTools() {
  const modelContext = navigator.modelContext;
  if (!modelContext?.registerTool && !modelContext?.provideContext) return undefined;

  const controller = new AbortController();
  const disposers: Array<() => void> = [];
  const tools = buildTools();

  try {
    for (const tool of tools) {
      if (modelContext.registerTool) {
        rememberDisposer(modelContext.registerTool(tool, { signal: controller.signal }), disposers);
      }
    }

    if (modelContext.provideContext) {
      rememberDisposer(
        modelContext.provideContext(
          {
            name: "anir0y-public-site",
            description: "Public navigation, search, and contact context for anir0y.in.",
            tools,
          },
          { signal: controller.signal },
        ),
        disposers,
      );
    }
  } catch (error) {
    console.warn("WebMCP registration failed", error);
  }

  return () => {
    controller.abort();
    for (const dispose of disposers) dispose();
  };
}
