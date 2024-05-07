// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';
import ResizeObserver from 'resize-observer-polyfill';

Object.assign(global, { TextDecoder, TextEncoder });
global.ResizeObserver = ResizeObserver;
