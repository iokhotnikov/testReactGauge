REPORTER = spec
test-coveralls:
	babel-node ./node_modules/istanbul/lib/cli cover \
	node_modules/mocha/bin/_mocha -- --bail --recursive test/.setup.js test/**/*.test.js --require ignore-styles && \
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js --verbose