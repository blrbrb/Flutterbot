const fs = require('fs');
const {SimpleDatabase} = require('../utils.js');


class Evaluator
{
   constructor() {
    this.db = new SimpleDatabase('./assets/t_db.json')
      }
   
   validateAge(user)
   {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
      return user.createdAt < oneMonthAgo;
   }


   
}