# /bin/sh



FILE=error_log.txt

function logmanager() 
{
		
minimumsize=90000
actualsize=$(wc -c <$1)
if [ $actualsize -ge $minimumsize ]; then
    echo log file size is over $minimumsize bytes 
    echo Clearing Log File… 
    
    > error_log.txt
   
else
    echo log file size is under $minimumsize bytes
fi
	
	
	
}


#check to see if the error log file exists, and wether or not it has passed the size limit to be cleared and reset 
if [ -f "$FILE" ]; then
    echo "$FILE exists."
    logmanager "$FILE"

   else 
    echo "$FILE does not exist. Initalizing javascript error log..." 
    touch error_log.txt 
fi


while true 

do 

echo Starting Fluttershy 
{
echo 

 node .; 
 
   
 echo 
 

  
}  2>> error_log.txt 

echo ----------------------------------------------------------------------------------------------------- >> error_log.txt
date +"Error Generated at: %A %d %B %r" >> error_log.txt 



echo There Was An Error… 

echo details written to "$FILE" 



 

echo Restarting Fluttershy in 30 Seconds... 


sleep 30

done 


