# /bin/sh



FILE=error_log.txt

function check_os() 
{
  os_type='' 


if [ "$(uname)" == "Darwin" ]; then
	# Do something under Mac OS X platform    
	local os_typeMac="Mac"  
	 os_type=$os_type$os_typeMac

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	local os_typeLinux="Linux"
	 os_type=$os_type$os_typeLinux

elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
	local os_typeWin32="Win32" 
	 os_type=$os_type$os_typeWin32
 
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then	
	local os_typeWin64="Win64"
	 os_type=$os_type$os_typeWin64  
fi

}


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

check_os 

echo $os_type


while true 

do 

echo Starting Fluttershy 
{
echo 

 $(node .)   
	   echo "Launched: $? - Successfully"


   
 echo 
 

read -t -N 1 input 
 
  
}  2>> error_log.txt 

echo ----------------------------------------------------------------------------------------------------- >> error_log.txt
date +"Error Generated at: %A %d %B %r" >> error_log.txt 



echo There Was An Error… 
 echo "${?}\n". 1>&2 

echo details written to "$FILE" 



 

echo Restarting Fluttershy in 30 Seconds... 
echo Enter 'q' to abort the process 

read -N 1 input 

if[input='q'] then; 

echo exiting process...    
break; 

sleep 30

done 


