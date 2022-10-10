

const Container = document.querySelector(".container");

//const RadioSelect = document.querySelector('input[name="method_search"]:checked');

const InputSearch = document.querySelector('.search');

const BtnSearch = document.querySelector('.btn-search');


//let typeSearch = (RadioSelect as HTMLInputElement).value;


    (BtnSearch as HTMLButtonElement)?.addEventListener("click", () =>{
        //console.log(typeSearch)

            filterByIngredients((InputSearch as HTMLInputElement).value);
            if(Container){
                Container.innerHTML = '';
            }
        Exibir()
    })
    
    function splitSearch(search: string){
        const parsedSearch = search.replace(/\s/g, "").split(",");
        return parsedSearch.filter((search) => search);
    }
    
    async function getData() {
        const request = await fetch('https://receitas-server.vercel.app/api');
        const data = await request.json();
        console.log(data);
        return data;
    }
    
     async function filterByIngredients(ingredient: string) {
        const data = await getData();
        const filteredData = data.filter((recipe: { Author: string; Description: string; Ingredients: string[]; Method: string[]; Name: string; url: string; urlImage: string}) => {
            const isMultiple = splitSearch(ingredient).length > 1;
    
            if(!ingredient) return data;
    
            if(!isMultiple){
                const ingredientIncludes = recipe.Ingredients.filter((recipeIngredient) => {
                    return recipeIngredient.toLowerCase().includes(ingredient.toLowerCase());
                });
    
                return ingredientIncludes.length ? recipe : false;
            }
    if(isMultiple){
        let acumulator:string[] = [];
        const searchValues = splitSearch(ingredient);
    
        for(let i = 0; i < searchValues.length; i++){
            for(let y = 0; y< recipe.Ingredients.length; y++){
                if(recipe.Ingredients[y].includes(searchValues[i])){
                    if(acumulator.includes(searchValues[i])){
                        return false;
                    }
                    acumulator.push(searchValues[i]);
                }
            }
        }
    
        if(acumulator.length === searchValues.length) return true;
    }
        });
        console.log(filteredData);
        return filteredData;
     }
    
     async function Exibir() {
        const Retorno = await getData();
        const itens = await filterByIngredients((InputSearch as HTMLInputElement).value);
    
    if(Container){
        itens.forEach((item: any) => {
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
        })
    }
    
     }
