
## Typescript

**Parcel 1** транспилировал TypeScript с помощью tsc(официального компилятора TypeScript). **Parcel 2** теперь **использует SWC** , что значительно повышает производительность транспиляций.

**SWC** - это транспилятор JavaScript и TypeScript, написанный на языке Rust. Он преобразует код JavaScript или TypeScript из современных стандартов в совместимый с более старыми браузерами или средами выполнения JavaScript код.

**SWC** можно использовать как для **компиляции**, так и для **бандлинга**. Для компиляции он берет файлы JavaScript/TypeScript, используя современные функции JavaScript, и выводит валидный код, поддерживаемый всеми основными браузерами.

SWC разработан с возможностью расширения. В настоящее время поддерживается:

- Компиляция
- Комплектация (swcpack, в разработке)
- Минификация
- Трансформация с помощью WebAssembly
- Использование внутри webpack (swc-loader) - попробовать использовать
- Улучшение производительности Jest ( @swc/jest)
- Пользовательские плагины

Однако транспилятор по умолчанию имеет ограниченную поддержку tsconfig.json. Если вы используете пользовательские параметры компилятора помимо параметров, связанных с JSX и experimentalDecorators, вы можете заменить преобразователь TypeScript Parcel по умолчанию на TSC с помощью @parcel/transformer-typescript-tsc. Для этого установите конфигурацию по умолчанию и плагин TSC и создайте .parcelrc файл в корне вашего проекта.

```npm
yarn add @parcel/config-default @parcel/transformer-typescript-tsc --dev
```

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.{ts,tsx}": ["@parcel/transformer-typescript-tsc"]
  }
}
```

Дополнительную информацию об использовании TypeScript с Parcel смотрите в [в документации TypeScript](https://parceljs.org/languages/typescript).

## Flow

Как и Parcel 1, Parcel 2 автоматически поддерживает Flow при flow-bin установке. В настоящее время это реализовано с помощью @babel/preset-flow. Если у вас есть конфигурация Babel только с этой предустановкой, ее можно удалить, как описано выше .

В отличие от Parcel 1, ваша конфигурация Babel переопределяет конфигурацию по умолчанию в Parcel 2, а не объединяется с ней. Если у вас есть пользовательские плагины Babel, отличные от Flow, вам @babel/preset-flow также нужно будет их добавить.

Flow и TypeScript оба предоставляют статическую типизацию для JavaScript, но существуют некоторые различия между ними.

## Babel 

Как и Parcel 1, Parcel 2 автоматически обнаруживает .babelrc и другие файлы конфигурации Babel. Однако, если вы используете только @babel/preset-env, @babel/preset-typescript, и @babel/preset-react, Babel может больше не понадобиться. Parcel поддерживает все эти функции автоматически без конфигурации Babel, а транспилятор Parcel по умолчанию намного быстрее Babel.

Если вы используете только указанные выше предустановки, вы можете полностью удалить конфигурацию Babel. Это позволит использовать транспилятор Parcel по умолчанию, что должно значительно повысить производительность сборки. Обязательно настройте browserslist в package.json соответствии с целями, которые ранее использовались @babel/preset-env.

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead"
    }],
    "@babel/preset-react"
  ]
}
```

=>

```json
{
  "browserslist": "> 0.25%, not dead"
}
```

## package.json#main

Многие **package.json** файлы (например, сгенерированный **npm init**) содержат **main** поле, которое игнорируется большинством инструментов (для проектов, не являющихся библиотеками). Однако, когда main поле обнаружено, Parcel делает вывод, что **ваш проект является библиотекой**, и использует его в качестве выходного пути. **Для большинства веб-приложений эту строку следует удалить.**

```json
{
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  }
}
```

Если вам действительно нужно сохранить main поле и вы хотите, чтобы Parcel его игнорировал, вы можете добавить его "targets": { "main": false }в свой package.json. Подробности см. в разделе [Цели библиотеки](https://parceljs.org/features/targets/#library-targets).

## CLI

В Parcel 1 --target опция CLI контролировала, для какой среды был скомпилирован ваш код. В Parcel 2 это настраивается в package.json. Например, установка engines поля для включения ключа node или electron изменит цель соответствующим образом.

```npm
parcel build index.js --target node
```

```json
{
  "engines": {
    "node": "10"
  }
}
```

## --bundle-node-modules

Чтобы объединить пакеты node_modules при выборе Node.js, теперь необходимо указать это в целевой конфигурации:

```json
{
  "targets": {
    "default": {
      "includeNodeModules": true
    }
  },
  "engines": {
    "node": "10"
  }
}
```

## --out-dir

Параметр --out-dirCLI был переименован в , --dist-dir чтобы соответствовать distDir параметру в package.json. Подробности см. в разделе [Цели](https://parceljs.org/features/targets/#targets).

```npm
parcel build index.html --out-dir www
```
=>
```npm
parcel build index.html --dist-dir www
```

## --out-file

Параметр --out-file CLI был удален, и вместо этого путь следует указывать в package.json. Подробности см. в [разделах Несколько целей](https://parceljs.org/features/targets/#multiple-targets) и [Библиотечные цели](https://parceljs.org/features/targets/#library-targets).

```npm
parcel build index.js --out-file lib.js
```
=>
```json
{
  "name": "my-library",
  "version": "1.0.0",
  "main": "lib.js"
}
```

## --no-minify

Эта опция была переименована в --no-optimize.

```npm
parcel build index.js --no-minify
```

```npm
parcel build index.js --no-optimize
```
## API

Программное использование Parcel 2 возможно через @parcel/core пакет, а не parcel-bundler. API значительно изменился. Подробности см. в [Parcel API](https://parceljs.org/features/parcel-api/).