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
{

 node .
}
 >> error_log.txt 
     

echo There Was An Error 

echo Restarting Fluttershy in 30 Seconds... 


sleep 30

done 


