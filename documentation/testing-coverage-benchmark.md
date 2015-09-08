## Testing, coverage and benchmark

* `npm test` or `gulp mocha` - run tests
* `gulp cover` - check tests coverage
* `gulp benchmark` - rum performance test
* `gulp readme` - prepare README.md from `documentation` folder
 
## Code coverage

    Statements ................................... 100% ( 123/123 )
    Branches ..................................... 96.67% ( 58/60 )
    Functions .................................... 100% ( 20/20 )
    Lines ........................................ 100% ( 123/123 )


## Performance test

    Get simple key ............................... 5,799,240 ops/sec +0.47%
    Get deep key ................................. 5,488,370 ops/sec +0.31%
    Get key with reference ....................... 1,508,501 ops/sec +0.23%
    Get key with reference and template .......... 106,877 ops/sec +0.27%
    Get key with deep references ................. 274,983 ops/sec +0.80%
    Get key with deep references and template .... 108,919 ops/sec +0.25%
    Set simple key ............................... 3,446,469 ops/sec +0.26%
    Set deep key ................................. 3,135,072 ops/sec +1.82%

