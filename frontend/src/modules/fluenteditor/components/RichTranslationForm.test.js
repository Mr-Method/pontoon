import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { fluent } from 'core/utils';

import RichTranslationForm from './RichTranslationForm';


const DEFAULT_LOCALE = {
    direction: 'ltr',
    code: 'kg',
    script: 'Latin',
};

const TRANSLATION = fluent.parser.parseEntry(
    'message = Value\n    .attr-1 = And\n    .attr-2 = Attributes'
)

const EDITOR = {
    translation: TRANSLATION,
    errors: [],
    warnings: [],
};


describe('<RichTranslationForm>', () => {
    it('renders textarea for a value and each attribute', () => {
        const updateMock = sinon.stub();

        const wrapper = shallow(<RichTranslationForm
            editor={ EDITOR }
            locale={ DEFAULT_LOCALE }
            updateTranslation={ updateMock }
        />);

        expect(wrapper.find('textarea')).toHaveLength(3);
        expect(wrapper.find('textarea').at(0).html()).toContain('Value');
        expect(wrapper.find('textarea').at(1).html()).toContain('And');
        expect(wrapper.find('textarea').at(2).html()).toContain('Attributes');
    });

    it('calls the updateTranslation function on mount and change', () => {
        const updateMock = sinon.spy();

        const wrapper = shallow(<RichTranslationForm
            editor={ EDITOR }
            locale={ DEFAULT_LOCALE }
            updateTranslation={ updateMock }
        />);

        expect(updateMock.calledOnce).toBeTruthy();
        wrapper.find('textarea').at(0).simulate('change', { currentTarget: { value: 'good bye' } });
        expect(updateMock.calledTwice).toBeTruthy();
    });
});