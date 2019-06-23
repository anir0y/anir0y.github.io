echo "------------StarT-------------"
echo date +%F
echo Pushing update
echo adding stuffs
git add --all
sleep 2
git commit -m "Automate push via script."
echo msg added
sleep 1
git push origin master
echo "--------------DonE-----------"
