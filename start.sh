# /bin/sh



FILE=error_log.txt
CLEARSIZE=500000;
if [ -f "$FILE" ]; then
    echo "$FILE exists."

   else 
    echo "$FILE does not exist. Initalizing javascript error log..." 
    touch error_log.txt 
fi


while true 

do 

echo Starting Fluttershy 


 node . 2> error_log.txt 
     

echo There Was An Error 

echo Restarting Fluttershy in 30 Seconds... 

echo uploading error log to Github... 

git add error_log.txt 

msg = "bash script uploading error_log.txt"

git commit -m msg 

git push -u origin main 

sleep 30

done 


