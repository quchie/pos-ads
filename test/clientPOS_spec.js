import chai, { expect } from 'chai'
import { mount , shallow  } from 'enzyme';
import Home from '../common/routes/Home/components/Home'
import App from '../common/components/App'
import jsdom from 'mocha-jsdom'


describe('POS unit test', () => {

  jsdom()

  it('should return $987.97 for Customer: default (ID added: classic, standout, premium)', () => {
    const wrapper = shallow(<Home />);
    wrapper.setState({ value: 'default' });
    wrapper.instance().addClassic({target:{value:'classic'}});
    wrapper.instance().addStandout({target:{value:'standout'}});
    wrapper.instance().addPremium({target:{value:'premium'}});
    wrapper.update();
    expect(wrapper.state().price).to.equal(987.97);
  })

  it('should return $934.97 for Customer: Unilever (ID added: classic, classic, classic, premium)', () => {
    const wrapper = shallow(<Home />);
    wrapper.setState({ value: 'Unilever' });
    wrapper.instance().addClassic({target:{value:'classic'}});
    wrapper.instance().addClassic({target:{value:'classic'}});
    wrapper.instance().addClassic({target:{value:'classic'}});
    wrapper.instance().addPremium({target:{value:'premium'}});
    wrapper.update();
    expect(wrapper.state().price).to.equal(934.97);
  })

  it('should return $1294.96 for Customer: Apple (ID added: standout, standout, standout, premium)', () => {
    const wrapper = shallow(<Home />);
    wrapper.setState({ value: 'Apple' });
    wrapper.instance().addStandout({target:{value:'standout'}});
    wrapper.instance().addStandout({target:{value:'standout'}});
    wrapper.instance().addStandout({target:{value:'standout'}});
    wrapper.instance().addPremium({target:{value:'premium'}});
    wrapper.update();
    expect(wrapper.state().price).to.equal(1294.96);
  })

  it('should return $1519.96 for Customer: Nike (ID added: premium, premium, premium, premium)', () => {
    const wrapper = shallow(<Home />);
    wrapper.setState({ value: 'Nike' });
    wrapper.instance().addPremium({target:{value:'premium'}});
    wrapper.instance().addPremium({target:{value:'premium'}});
    wrapper.instance().addPremium({target:{value:'premium'}});
    wrapper.instance().addPremium({target:{value:'premium'}});
    wrapper.update();
    expect(wrapper.state().price).to.equal(1519.96);
  })
})
