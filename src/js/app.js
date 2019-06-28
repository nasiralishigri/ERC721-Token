// import { fileURLToPath } from "url";

App = {
    web3Provider: null,
    contracts: {},
  


    init: function() {
      console.log("App initialized...")
      return App.initWeb3();
    },
    
  
    initWeb3: async function() {
      /*
       * Replace me...
       */
       // Modern dapp browsers...


      //  if (typeof web3 !== 'undefined') {
      //   // If a web3 instance is already provided by Meta Mask.
      //   App.web3Provider = web3.currentProvider;
      //   web3 = new Web3(web3.currentProvider);
      // } else {
      //   // Specify default instance if no web3 instance provided
      //   App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      //   web3 = new Web3(App.web3Provider);
      // }
      // return App.initContract();


                                  if (window.ethereum) {
                                    App.web3Provider = window.ethereum;
                                    try {
                                      // Request account access
                                      await window.ethereum.enable();
                                    } catch (error) {
                                      // User denied account access...
                                      console.error("User denied account access")
                                    }
                                  }
                                  // Legacy dapp browsers...
                                  else if (window.web3) {
                                    App.web3Provider = window.web3.currentProvider;
                                  }
                                  // If no injected web3 instance is detected, fall back to Ganache
                                  else {
                                    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
                                  }
                                  web3 = new Web3(App.web3Provider);
  
      return App.initContract();
    },
  
    initContract: function() {
      /*
       * Replace me...
       */
       
                               $.getJSON('ERC721_Implementation.json', function(data) {
                                // Get the necessary contract artifact file and instantiate it with truffle-contract
                                var AdoptionArtifact = data;
                                // console.log("Your account is :"+ AdoptionArtifact.address);
                                App.contracts.ERC721_Implementation = TruffleContract(AdoptionArtifact);
  
                                // Set the provider for our contract
                                App.contracts.ERC721_Implementation.setProvider(App.web3Provider);
  
                                // Use our contract to retrieve and mark the adopted pets
                                // return App.markAdopted();
                                // App.contracts.ERC721_Implementation.deployed().then(function(inst){
                                //   console.log("Your Deployment Account is : "+inst.address);




                                // })
                              return App.bindEvents();
                                

                              });
                              
    },
    bindEvents: function(){



      // console.log("Check Account Matched: "+ web3.eth.getAccount([0]));
      web3.eth.getBlock((err,result)=>{
  
        console.log("gasLimit: " + result.gasLimit);
      });

      App.contracts.ERC721_Implementation.deployed().then(function(inst){
        return inst.testGasLimit();
      }).then(function(gasLimit){
        var stringify = JSON.stringify(gasLimit);
          //  gasLimit.receipt.gasUsed();

          console.log("Gas Limit is: "+gasLimit.receipt.gasUsed);
        // var x= gasLimit.gasUsed();
        // console.log("Gas Used "+ x);
        console.log("Stringify testGasLimit function : "+ stringify);
        console.log("Gas Limit through Solidity is : "+ gasLimit);
      })
     


      App.contracts.ERC721_Implementation.deployed().then(function(instance){  // Get Balance

        return instance.getBalanceOf();


      }).then(function(balance){
      console.log("Your Balance is: "+balance);

      });

      var cardId;
      
      $('.click-adopt').on('click', function(){    // Click on Bought Card
        cardId = $(this).parent().siblings('.card-body').find('h6').attr('id');
          console.log($(this).text());
          console.log("Id is check: "+cardId);

          App.contracts.ERC721_Implementation.deployed().then(function(instance){ // Owner

     
      
            // alert("Id is : "+cardId);
            // console.log("Address of Account[0] is "+  web3.eth.accounts[0]);
            console.log("Address of Instance is : "+web3.eth.accounts[0]);
            console.log("Id is called : "+ cardId);
      
              return instance.mintUniqueTokenTo(web3.eth.accounts[0] ,cardId);
            // }).then(function(inst){
            //   console.log("Instance of Bought Token : "+JSON.stringify(inst));
            });
      });
     
//       $('#checkToken').on('click', function(){
//         totalToken = $('#noOfToken');
//         App.contracts.ERC721_Implementation.deployed().then(function(instance){

//           return instance.noOfTokens();
//         }).then(function(tokens){
// console.log("You have  Tokens "+ tokens);
// console.log("Stringify Json of noOfTokens functions : "+ JSON.stringify(tokens));

//         })
//       });




//       App.contracts.ERC721_Implementation.deployed().then(function(instance){

//         // return instance.ownerToken(123);

//       });


      $('Button').on('click', function(){      // On Button Clicked
        var text = $(this).text();
        if(text== "Total Tokens"){ // Check Total Token on the Address Used
// alert("Total Tokens Pressed");
      App.contracts.ERC721_Implementation.deployed().then( async function(instance){

      var x = await instance.noOfTokens();
      //  console.log("X value is "+JSON.stringify(x));
       console.log("You have : "+x.logs[0].args._token + "    Tokens");


                                          });
                                    }

        
        if(text == "Check Token Owner"){ // Check Token owner
          // alert("Check Token Existance Pressed");
          App.contracts.ERC721_Implementation.deployed().then(async function(inst){
            var owner = await inst.ownerOfToken(12);
            console.log("Check owner address of token "+JSON.stringify(owner));

                                               })

                                           }
          if(text == "Transfer Token"){ // Transfer Token on another Address
          // alert("Transfer from is clicked");
            // console.log("Transfer from is clicked");
            App.contracts.ERC721_Implementation.deployed().then(async function(instance){

              var transferToken = await instance.transferToken(web3.eth.accounts[0], "0x7604B58e56e21d7eEC7BdBFF1A572f2b216690C7", 12);
                                                   })
                                       }
              
           if(text == "Approve Token"){

             alert("You press Approve Token on this Address");

             App.contracts.ERC721_Implementation.deployed().then(async function(instance){
               var approveToken = await instance.approveTokenTransfer("0x7604B58e56e21d7eEC7BdBFF1A572f2b216690C7",12);
             })


           }
          

      }) // Button Click ending tag

          
          }
      };


      $(function() {
          $(window).on('load', function() {
            App.init();
          });
        });
