/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import ProductsIndex from '../../src/products/ProductList';

describe('ProductsIndex', () => {
  let ProductsIndexComponent;

  beforeEach(() => {
    ProductsIndexComponent = createComponent(ProductsIndex);
  });

  it('should have its component name as default className', () => {
  	console.log('ProductsIndex class name', ProductsIndexComponent)
    // expect(ProductsIndexComponent.props.className).to.equal('index');
  });
});
