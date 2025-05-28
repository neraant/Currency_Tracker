import '@testing-library/jest-dom';
import 'dotenv/config';
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
