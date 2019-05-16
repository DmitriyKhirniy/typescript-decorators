# Typescript Decorators

Custom Typescript decorators for Angular applications

## Getting Started

You can just copy and paste selected decorator into your code. Pay attention on the imports and inner interfaces.

### Safe

Safe can be used for wrapping up methods. Main idea is to wrap method with try/catch construction
and create safe execution scope

```
  @Safe()
  private showAllSeries(excludeIndex?: number): void {}
```

You can pass an argument to decorator

```
  @Safe({returnValue: {}})
  private getParams(clone: HttpRequest<any>) {}
```
In case of error you can easily catch it and return whatever you need

### Feature Flipper

There are a lot of cases when you need to have specific feature be presented only by flag
or through command. 
 
```
  @FeatureFlipper('use_histogram_shift', StorageType.Local, 'HistogramShift')
  private shiftEnabled: boolean;
```


## Built With

* [Angular](https://angular.io/) - The web framework used
* [Typescript](https://www.typescriptlang.org/) - Programming language

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
