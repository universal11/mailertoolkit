mailertoolkit
=============

mailer tool kit


Instructions:

/////////////////////////
//create a new campaign
/////////////////////////


./campaign-controller create -v optonline -c "proactiv" -t "/path/to/master/template"




/////////////////////////
//generate batch command
/////////////////////////

./campaign-controller build -v "optonline" -c "proactiv" -p "prime" -f "mariolovesmushrooms.com" -a "you-cost123" -r "/path/to/accounts/file"
