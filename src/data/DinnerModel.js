import ObservableModel from "./ObservableModel";
import  API_KEY from "./API_KEY.js";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/70";
const httpOptions = {
  headers: { "X-Mashape-Key": API_KEY }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
    this.menu = [];
    this.type = "";
    this.filter = ""; 
    this.selectedDish;
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
   // this.getDish(592479).then(dishX => this.addToMenu(dishX));
    this.notifyObservers();
  }

  getMenu() {
    return this.menu;
   }

  
  addMenu(dish) {
    this.menu.push(dish); //LÄgg till check för dubbletter. 
    console.log(this.getMenu());
    this.notifyObservers();
  }
  
  setSelectedID(id) {
    this.selectedDish = id;
    this.notifyObservers();
  }

  getSelectedID() {
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
    this.notifyObservers();
  }

  setType(type){
    this.type = type;
    this.notifyObservers();
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