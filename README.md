# Platform

[![npm (scoped)](https://img.shields.io/npm/v/@told/platform.svg)](https://www.npmjs.com/package/@told/platform)
[![Build Status](https://travis-ci.org/toldsoftware/platform.svg?branch=master)](https://travis-ci.org/toldsoftware/platform)
[![Coverage Status](https://coveralls.io/repos/github/toldsoftware/platform/badge.svg)](https://coveralls.io/github/toldsoftware/platform)

Platform dependency injection

## Potential Targets

- browser - clients and karma testing
- node.js - server
- nativescript - mobile apps

## Usage

- npm install @told/platform --save

- In Typescript File:

    import * as P from 'platform';
    import { SOMETHING } from 'platform';

- Before calling any code:

    BrowserPlatformProvider.Setup(); // Or NodePlatformProvider.Setup() etc.