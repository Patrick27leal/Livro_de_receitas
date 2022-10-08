
const Container = document.querySelector(".container");

function splitSearch(search: string){
    return search.split(",");
}

async function getData() {
    const request = await fetch('https://receitas-server.vercel.app/api');
    const data = await request.json();
    return data;
}

 async function filterByIngredients(ingredient: string) {
    const data = await getData();
    const filteredData = data.filter((recipe: { Author: string; Description: string; Ingredients: string[]; Method: string[]; Name: string; url: string; urlImage: string}) => {
        const isMultiple = splitSearch(ingredient).length > 1;

        if(!isMultiple){
            const ingredientIncludes = recipe.Ingredients.filter((recipeIngredient) =>{
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
 }

 filterByIngredients('dark , egg');