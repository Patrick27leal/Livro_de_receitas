const Container = document.querySelector(".container");

async function Exibir() {
    const IniciaRequisição = await fetch(`https://receitas-server.vercel.app/api`);
    const Response = await IniciaRequisição.json();
    const DadosReceita = JSON.parse(JSON.stringify(Response)) 
    return DadosReceita;
}

 const RetornoConsulta = Exibir();


/*  if (Container) {
    RetornoConsulta.forEach((response) => {
        Container.innerHTML += `
        
        `;

    })
} */