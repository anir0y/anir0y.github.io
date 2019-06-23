echo Pushing update
echo adding stuffs
git add --all
sleep 2
date = date
git commit -m "Automate push via script at $date"
echo msg added
sleep 1
git push origin master
echo "--------------DonE-----------"
