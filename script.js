"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Container = document.querySelector(".container");
const BtnSearch = document.querySelector('.btn-search');
const InputSearch = document.querySelector('.search');
BtnSearch === null || BtnSearch === void 0 ? void 0 : BtnSearch.addEventListener("click", () => {
    filterByIngredients(InputSearch.value);
});
function splitSearch(search) {
    return search.split(",");
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield fetch('https://receitas-server.vercel.app/api');
        const data = yield request.json();
        return data;
    });
}
function filterByIngredients(ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getData();
        const filteredData = data.filter((recipe) => {
            const isMultiple = splitSearch(ingredient).length > 1;
            if (!isMultiple) {
                const ingredientIncludes = recipe.Ingredients.filter((recipeIngredient) => {
                    return recipeIngredient.toLowerCase().includes(ingredient.toLowerCase());
                });
                return ingredientIncludes.length ? recipe : false;
            }
            if (isMultiple) {
                let acumulator = [];
                const searchValues = splitSearch(ingredient);
                for (let i = 0; i < searchValues.length; i++) {
                    for (let y = 0; y < recipe.Ingredients.length; y++) {
                        if (recipe.Ingredients[y].includes(searchValues[i])) {
                            if (acumulator.includes(searchValues[i])) {
                                return false;
                            }
                            acumulator.push(searchValues[i]);
                        }
                    }
                }
                if (acumulator.length === searchValues.length)
                    return true;
            }
        });
        console.log(filteredData);
    });
}
