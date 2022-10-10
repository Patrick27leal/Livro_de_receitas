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
//const RadioSelect = document.querySelector('input[name="method_search"]:checked');
const InputSearch = document.querySelector('.search');
const BtnSearch = document.querySelector('.btn-search');
//let typeSearch = (RadioSelect as HTMLInputElement).value;
BtnSearch === null || BtnSearch === void 0 ? void 0 : BtnSearch.addEventListener("click", () => {
    //console.log(typeSearch)
    filterByIngredients(InputSearch.value);
    if (Container) {
        Container.innerHTML = '';
    }
    Exibir();
});
function splitSearch(search) {
    const parsedSearch = search.replace(/\s/g, "").split(",");
    return parsedSearch.filter((search) => search);
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield fetch('https://receitas-server.vercel.app/api');
        const data = yield request.json();
        console.log(data);
        return data;
    });
}
function filterByIngredients(ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getData();
        const filteredData = data.filter((recipe) => {
            const isMultiple = splitSearch(ingredient).length > 1;
            if (!ingredient)
                return data;
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
        return filteredData;
    });
}
function Exibir() {
    return __awaiter(this, void 0, void 0, function* () {
        const Retorno = yield getData();
        const itens = yield filterByIngredients(InputSearch.value);
        if (Container) {
            itens.forEach((item) => {
                Container.innerHTML += `
            <div class="box-receita">
            <div class="box-tittle-receita">
                <h3>${item.Name}</h3>
            </div>
            <div class="box-body-receitas">
                <div class="box-header-receita">
                    <div class="box-image">
                        <img class="img-receita" src="${item.urlImage}" alt="">
                    </div>
    
                    <div class="box-ingredientes">
                        <div class="box-ingredientes-tittle">
                            <h3>INGREDIENTES</h3>
                        </div>
                        <p>
                        ${item.Ingredients}
                        </p>
                    </div>
                </div>
    
    
                <div class="box-modopreparo">
                    <div class="box-modopreparo-tittle">
                        <h3>MODO DE PREPARO</h3>
                    </div>
                    <P>
                    ${item.Method}
                    </P>
                </div>
    
                <div class="footer-receita">
                    <div class="box-autor">
                        <h6 class="text-referencia">AUTOR: ${item.Author}</h6>
                    </div>
    
                </div>
    
            </div>
        </div>
            `;
            });
        }
    });
}
