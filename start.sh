# /bin/sh



FILE=error_log.txt
CLEARSIZE=500000;
if [ -f "$FILE" ]; then
    echo "$FILE exists."

    FILESIZE=$(stat -c%s "$FILE") 

        if ((FILESIZE > CLEARSIZE )); then 
            echo "error_log file has reached maximum size, clearing memory.." 
            > error_log.txt 
        fi
else 
    echo "$FILE does not exist. Initalizing javascript error log..." 
    touch error_log.txt 
fi


while true 

do 

echo Starting Fluttershy 
if [ -f "$FILE" ]; then 
     node . 2> error_log.txt 
     

else 
    node . 
fi  

echo Restarting Fluttershy in 10 Seconds... 


sleep 10 

done 


