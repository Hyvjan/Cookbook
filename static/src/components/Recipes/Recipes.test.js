import React from 'react';
import Recipes from './Recipes';

import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Recipes>',() => {
    it('If current recipe !== indexValue then style background is brown', () => {
        const wrapper = shallow(<Recipes singleRecipe={{name:"test"}} currentRecipe={1} indexValue={2}/>);
        //wrapper.setProps({currentRecipe:1, indexValue:2});
        expect(wrapper.find('div').props().style).toHaveProperty('backgroundColor', 'brown');
    });

    it('If current recipe === indexValue then style background is yellow', () => {
        const wrapper = shallow(<Recipes singleRecipe={{name:"test"}} currentRecipe={1} indexValue={1}/>);
        //wrapper.setProps({currentRecipe:1, indexValue:2});
        expect(wrapper.find('div').props().style).toHaveProperty('backgroundColor', 'yellow');
    });

});