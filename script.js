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
function Exibir() {
    return __awaiter(this, void 0, void 0, function* () {
        const IniciaRequisição = yield fetch(`https://receitas-server.vercel.app/api`);
        const Response = yield IniciaRequisição.json();
        const DadosReceita = JSON.parse(JSON.stringify(Response));
        return DadosReceita;
    });
}
const RetornoConsulta = Exibir();
/*  if (Container) {
    RetornoConsulta.forEach((response) => {
        Container.innerHTML += `
        
        `;

    })
} */ 
