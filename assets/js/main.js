(function($) {
    'use strict';
  
    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"
  
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
  
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
  
    Essas informações devem ser adicionadas no HTML via Ajax.
  
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
  
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

    let app = (function (){
      return {
        init: function init(){
          console.log('Função init');
          this.companyInfo();
          this.initEvents();
        },

        initEvents: function initEvents(){
          $('[data-js="form-register"]').on('submit',this.handleSubmit);
        },

        handleSubmit: function handleSubmit(event){
          event.preventDefault();
         let $tableCar = $('[data-js="table-car"]').get();
         $tableCar.appendChild(app.createNewCar());
        },

        createNewCar: function createNewCar(){
          let $fragment = document.createDocumentFragment();
          let $tr = document.createElement('tr');
          let $tdImage = document.createElement('td');
          let $image = document.createElement('img');
          let $tdBrand = document.createElement('td');
          let $tdYear =  document.createElement('td');
          let $tdPlate = document.createElement('td');
          let $tdColor = document.createElement('td');

          $image.src = $('[data-js="image"]').get().value;
          $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
          $tdYear.textContent = $('[data-js="year"]').get().value;
          $tdPlate.textContent = $('[data-js="plate"]').get().value;
          $tdColor.textContent = $('[data-js="color"]').get().value;
          console.log($tdBrand);
          $tdImage.appendChild($image);

          $tr.appendChild($tdImage);
          $tr.appendChild($tdBrand);
          $tr.appendChild($tdYear);
          $tr.appendChild($tdPlate);
          $tr.appendChild($tdColor);

          $fragment.appendChild($tr);

          return $fragment;
        },

        companyInfo: function companyInfo(){
          console.log('company info');
          let ajax = new XMLHttpRequest();
          ajax.open('GET','./company.json',true);
          ajax.send();
          ajax.addEventListener('readystatechange',this.getCompanyInfo,false);
        },

        getCompanyInfo: function getCompanyInfo(){
          console.log('getCompanyInfo');
          if(!app.isReady.call(this)){
            console.log('If GetCompanyInfo');
            return
          }
          
          console.log('Deu certo');
          let data = JSON.parse(this.responseText);
          let $companyName =  $('[data-js="company-name"]').get();
          let $companyTel =  $('[data-js="company-tel"]').get();

          $companyName.textContent= data.name;
          $companyTel.textContent = data.phone;
        },

        isReady: function isReady(){
          console.log(this.readyState, this.status);
          return this.readyState === 4 && this.status === 200;
        }
      }
    })()
    app.init()
  })(window.DOM);
  