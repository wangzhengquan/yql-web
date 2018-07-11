 import { expect } from 'chai'

 describe('reducer', function() {
    describe('加法函数的测试', function() {
         function add(x, y) {
             return x + y;
         }
         it('1 加 1 应该等于 2', function() {
             expect(add(1, 1)).to.be.equal(2);
         });

         it('任何数加0等于自身', function() {
             expect(add(1, 0)).to.be.equal(1);
             expect(add(0, 0)).to.be.equal(0);
         });
     });


    describe('counter reducer测试', function() {
      const counter = (state = 0, action) => {
        switch (action.type) {
          case 'INCREMENT': 
            return state + 1;
          case 'DECREMENT' :
            return state - 1;
          default :
            return state
        }
      }

      it('increment 0 === 1', function(){
        expect(counter(0, {type: 'INCREMENT'}) ).to.be.equal(1)
      })

    })

 });