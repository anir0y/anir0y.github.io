echo Pushing update
echo adding stuffs
git add --all
sleep 2
git commit -m "auto push via script"
echo push done!
sleep 1
git push origin master
