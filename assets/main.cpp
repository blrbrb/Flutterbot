#include <iostream> 


int main(int argc, char *argv[]) 
{
std::cout << "Is it possible for me to run custom c++ programs from Fluttershy?" << std::endl; 
std::cout << "please send any carriage return to continue" << std::endl; 

char input; 

std::cin >> input; 

if(input) 
{
	std::cout <<"valid character detected. What would you like to do?" << std::endl; 
	std::cout <<"1: Text Based Pony RPG (Work In Progress)" << std::endl; 
	std::cout <<"2: Attempt to have a conversation with FlutterAI (Work in Progress)" << std::endl; 
	std::cout <<"Please enter a number" << std::endl; 
	int selection; 
	std::cin >> selection; 


}
return 0; 

}
