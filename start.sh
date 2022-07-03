#! /bin/sh



FILE=error_log.txt 



 check_os() 
{
  os_type='' 


if [ "$(uname)" = "Darwin" ]; then
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



function clear_macOSFiles() 
{

if [ -f ".DS_Store" ]; then
	rm .DS_Store  
fi  

if [ -f "commands/.DS_Store" ]; then 
	cd commands 
	rm .DS_Store 
	cd - 
fi  

if [ -f "assets/.DS_Store" ]; then 
	cd commands 
	rm .DS_Store 
	cd - 
fi 

if [ -f "utils/.DS_Store" ]; then 
	cd commands 
	rm .DS_Store 
	cd - 
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

echo  $os_type












while true 


do 




tput setf 4
echo Starting Fluttershy 
{

tput bold 
 node .
 
}  2>> error_log.txt
 
tput sgr0

echo ----------------------------------------------------------------------------------------------------- >> error_log.txt
date +"Error Generated at: %A %d %B %r" >> error_log.txt 

echo There Was An Error… 

 echo "${?}\n" 1>&2 

echo details written to "$FILE" 

 

echo Restarting Fluttershy in 15 Seconds... 


sleep 15

echo -ne 'Clearing Cache: 0%)\r'  
	sleep 2 
	clear_macOSFiles 
echo -ne 'Clearing Cache: 12%\r' 
	sleep 2
echo -ne 'Clearing Cache: 67%\r'

echo -ne "Cache Cleared! Restarting Fluttershy..."

done 


