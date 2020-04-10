class RunnerNeuralNetwork {
    
    constructor(){
      
      this._nn = new brain.NeuralNetwork(this.getNNConfig());
    }

    getNNConfig() {   
      return {
        //outputSize: 1, // jump or not 
        //inputSize: 3, // player speed, distance to next role, current position Y
        hiddenLayers: [8], // array of ints for the sizes of the hidden layers in the network
        activation: 'relu' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
      };
    }

    run(inputs){
      /*const config = this.getNNConfig();
      if (inputs.length !== config.input - 1){
        throw new Exception("Wrong inputs length to run NeuralNetwork");
      }
*/
      return this._nn.run(inputs);
    }

    /**
     * Training methods  
     *
     */
    generateRandomInputs(bestInput) {
      const arr = [];
      const amountData = 20;

      if (bestInput){

      } else {
        // jump cases
        for (let i = 0; i < amountData; i++){
          let rnd = Math.floor((Math.random() * 600) + 1);
          arr.push({input: this.normalizeInput({ speed: 350, distance: rnd, height: 555 }), output:{ jump: 1 } });
        } 

        // double jump cases
        for (let i = 0; i < amountData; i++){
          let rnd = Math.floor((Math.random() * 600) + 1);
          let rnd2 = 555 - Math.floor((Math.random() * 100) + 1);
          arr.push({input: this.normalizeInput({ speed: 350, distance: rnd, height: rnd2 }), output:{ jump: 1 } });
        } 

        // not jump cases 
        for (let i = 0; i < amountData; i++){
          let rnd = Math.floor((Math.random() * 400) + 601);
          arr.push({input: this.normalizeInput({ speed: 350, distance: rnd, height: 555 }), output:{ idle: 0 } });
        } 
      }
      return arr;
    }

    normalizeInput(input){
      const max = { speed: 350, distance: 400, height: 556 };
      return { 
          speed: input.speed / max.speed, 
          distance: input.distance / max.distance,
          height: input.height / max.height 
        };
    }

    train(){
        const trainingData = this.generateRandomInputs();
        const config = {
          learningRate: 0.1,
          errorThresh: 0.003,
          iterations: 150000,
          log: false,
          logPeriod: 500,
        };
        console.log(trainingData);
        const training = this._nn.train(trainingData, config);
        console.log(training);
    }

    getWeights(){
      return this._nn.toJSON();
    }

}