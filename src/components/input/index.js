import Handlebars from "handlebars";
import tpl from './tpl.hbs'
import './style.scss'

Handlebars.registerPartial('input', tpl);

export function input(name, label, placeholder, style = {}) {
    style.width = style.width || '280px'; // длина инпута
    style.readOnly = style.readOnly || false;
    const readonly = style.readOnly ? 'readonly' : '';
    const className = readonly ? 'input__field_readonly' : '';
    return tpl({name, label, placeholder, readonly, style, className});
}

/*
* Я еще думал добавить пропс value, но решил, что лучше добавлять существующий текст либо через js, либо из функции возвращать еще метод для добавления значения в инпут
* */