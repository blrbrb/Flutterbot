#! /bin/sh

FILE=Flutterbot.log


bold=$(tput bold)
light_pink=$(tput setaf 5)
reset=$(tput sgr0)
CLIENT_PRREFIX="(${bold}${light_pink}Fluttershy Shell${reset}): "


print()
{
	echo $CLIENT_PRREFIX $1 
}

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

 clear_macOSFiles() 
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

 logmanager()   
{

#Force-Trunicate the error log if the error log is larger than 90mb 
#Warn the if the error log is approaching ./		
minimumsize=90000000
warningsize=80000000
actualsize=$(wc -c <$1)
if [ $actualsize -ge $minimumsize ]; then
	print log file size is over $minimumsize bytes 
	print Clearing Log File… 
	
	> $FILE

elif [ $actualsize -ge $warningsize ]; then
	print -e "\033[33mWARN: \033[0m" log file size is over $warningsize bytes 80mb, and will be trunicated at $minimumsize 90mb
else
	print log file size is under $minimumsize bytes
fi


}


#check to see if the error log file exists, and wether or not it has passed the size limit to be cleared and reset 
if [ -f "$FILE" ]; then
	print "$FILE exists."
	logmanager "$FILE"

   else 
	print "$FILE does not exist. Initalizing javascript error log..." 
	touch $FILE 
fi    

check_os 

print preparing fluttershy to run on enviornment:  $os_type



while true 


do 





print "Starting Fluttershy"
{
 
 node . $CLIENT_PRREFIX
 
}  2>> $FILE
 


echo ----------------------------------------------------------------------------------------------------- >> $FILE
date +"Error Generated at: %A %d %B %r" >> $FILE 

print There Was An Error… exec "${?}\n"

cat assets/image.txt 

 
print details written to "$FILE" 


print Restarting Fluttershy in 1 Seconds... 



done 


