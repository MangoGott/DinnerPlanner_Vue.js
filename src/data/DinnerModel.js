import ObservableModel from "./ObservableModel";
import  API_KEY from "./API_KEY.js";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/70";
const httpOptions = {
  headers: { "X-Mashape-Key": API_KEY }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();    
    this.type = "";
    this.filter = ""; 
    this.selectedDish;
    if(localStorage.selectedDish){
      this.selectedDish = localStorage.selectedDish;
    }else {
      this.selectedDish = 0;
    }
    
    this.menu;
    if(localStorage.menu){
      this.menu = JSON.parse(localStorage.menu);
    }else {
      this.menu = [];
    }
    
    this.numberOfGuests;
    if(localStorage.numberOfGuests){
      this.numberOfGuests = localStorage.numberOfGuests;
    }else {
      this.numberOfGuests = 2; 
    }


  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this.numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    if(num > 0){
    this.numberOfGuests = num;
    localStorage.numberOfGuests = num; 
   // this.getDish(592479).then(dishX => this.addToMenu(dishX));
    this.notifyObservers("changeGuests");
    }else{
      console.log("can't have negative guests");
    }
  }

  getMenu() {
    return this.menu;
   }

  
  addMenu(dish) {

    let i;
    let exists = false;

      for(i = 0; i < this.menu.length; i++){
        if(this.menu[i].id === dish.id){
          exists = true;
          console.log("aldready in menu!!");
        }
      }

      if(!exists){
        this.menu.push(dish); //LÄgg till check för dubbletter. Done!
        localStorage.menu = JSON.stringify(this.menu);
        console.log("Added to menu!");
        console.log(dish);

        this.notifyObservers("changeMenu");
      }
    
  }


  removeDish(dish){
    let i;
      for(i = 0; i < this.menu.length; i++){
        if(this.menu[i].id === dish.id){
          this.menu.splice(i,1);
          localStorage.menu = JSON.stringify(this.menu);
          console.log("removed!");
          this.notifyObservers("changeMenu");
        }
      }
  }    


//Fel objekt skickas in!
  menuPrice(){
    let menu = this.menu;
    let i; 
    let total = 0;
    for(i = 0; i < this.menu.length; i++){
      total += menu[i].pricePerServing;
      //Kanske måste kolla om PPS finns?
      }
    return Math.ceil(total * this.numberOfGuests);

  }
  setSelectedDish(id){
    this.selectedDish = id;  
    localStorage.selectedDish = id;
  }
  getSelectedDish(){
    return this.selectedDish; 
  }


  // API methods
  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  searchDish() {
    const url = `${BASE_URL}/recipes/search?number=10&offset=0&type='`+ this.type +`&query=` + this.filter;
    return fetch(url, httpOptions).then(this.processResponse);

  }

  setFilter(filter){
    this.filter = filter;
    this.notifyObservers("fetch");
  }

  setType(type){
    this.type = type;
    this.notifyObservers("fetch");
    
  }

  getDish(id) {
    const url = `${BASE_URL}/recipes/` + id +`/information`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;



//TODO ADD BetterNotify and update functions