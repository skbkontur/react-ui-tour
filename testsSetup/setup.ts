import { configure } from 'enzyme';
import { ReactSixteenAdapter } from './ReactSixteenAdapter';

configure({ adapter: new ReactSixteenAdapter() });
