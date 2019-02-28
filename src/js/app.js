
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Transact.json", function(transact) {
      
      App.contracts.Transact = TruffleContract(transact);
      
      App.contracts.Transact.setProvider(App.web3Provider);
      App.listenForEvents();

      return App.render();
    });
  },
  listenForEvents : function() {
App.contracts.Transact.deployed().then(function(instance){

  instance.Thappened({}, {
    fromBlock: 0,
    toBlock: 'latest'}).watch(function (error, event) {
    console.log("event triggered ", event)
    App.render();
       
  });

});
  
  },

  render: function() {
    var transactInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    
    App.contracts.Transact.deployed().then(function(instance) {
      transactInstance = instance;
      return transactInstance.k();
    }).then(function(k) {
      var transactionRecord= $("#transactionRecord");
      transactionRecord.empty();
      var landselect = $("#lNSelect");
      landselect.empty();
      for (var i = 0; i <10;i++) {
        transactInstance.lands(i).then(function(l) {
          var id = l[0];
          var prv = l[1];
          var dst = l[2];
          var ln = l[3];
          var o = l[4];
          if(i == 0)
          {
            if(transactionRecord.children().length != 0)
              {transactionRecord.empty();}
          }    
          
          var record = "<tr><th>" + id + "</th><td>" + prv + "</td><td>" + dst + "</td><td>" + ln + "</td><td>" + o +"</td></tr>"
          transactionRecord.append(record);
          
          var landSelected = "<option value='" + id + "'>" + ln + "</ option>"
          landselect.append(landSelected);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  ltransact: function (){
    var loader = $("#loader");
    var content = $("#content");
    var _ln = $("#lNSelect").val();
    var _addr = $("#dAddress").val();
    App.contracts.Transact.deployed().then(function(instance){
      return instance.changeOwner(_ln ,_addr, {from: App.account});
    }).then(function (result){
      
      
      loader.show();
      content.hide();
      
    }).catch(function (err){
      console.error(err);
    });
  }
};


$(function() {
  $(window).load(function() {
    App.init();
  });
});