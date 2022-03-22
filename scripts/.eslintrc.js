/* eslint-disable @typescript-eslint/no-magic-numbers */
module.exports = {
	"root": true,
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint",
	],
	"env": {
		"browser": false,
		"es6": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
	],
	"parserOptions": {
		"ecmaVersion": 2020,
		"sourceType": "script",
		"project": ["tsconfig.eslint.json"],
	},

	"rules": {
		"no-var": "error",
		"semi": [2, "always"],
		"quotes": [2, "double"],
		"no-empty-function": "off",
		"@typescript-eslint/no-empty-function": ["error", { "allow": ["constructors"] }],
		// "@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/ban-types": ["error", {
			"types": {
				"Foo": "Don't use Foo because it is unsafe",
				// "Record": "Don't use Foo because it is unsafe",
			},
		}],
		"no-useless-catch": [0],
		"@typescript-eslint/require-await": "error",//Disable or enable, methods called from routes need to be async tho
		"no-return-await": "error",
		"@typescript-eslint/restrict-template-expressions": "warn",
		"@typescript-eslint/restrict-plus-operands": "warn",
		"@typescript-eslint/no-base-to-string": "error",
		"no-implicit-coercion": "error",
		// "@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/consistent-type-assertions": ["warn", { assertionStyle: "as", objectLiteralTypeAssertions: "never" }],	//{ assertionStyle: "as", objectLiteralTypeAssertions: "never" } | { assertionStyle: "never"}
		// "@typescript-eslint/member-delimiter-style": "warn",	//Da problemas con algunas funciones flecha y el formatter
		"@typescript-eslint/no-confusing-non-null-assertion": "warn",
		"@typescript-eslint/no-confusing-void-expression": "warn",
		// "@typescript-eslint/no-unnecessary-condition": "warn",	//Da mas falsos positivos que otra cosa
		"@typescript-eslint/no-unnecessary-qualifier": "warn",
		"@typescript-eslint/no-unsafe-argument": "error",
		"@typescript-eslint/no-implicit-any-catch": "warn",
		"@typescript-eslint/non-nullable-type-assertion-style": "warn",
		"@typescript-eslint/prefer-enum-initializers": "warn",
		"@typescript-eslint/prefer-for-of": "warn",
		"@typescript-eslint/strict-boolean-expressions": "warn",
		"@typescript-eslint/switch-exhaustiveness-check": "warn",
		"@typescript-eslint/unified-signatures": "warn",
		"@typescript-eslint/prefer-string-starts-ends-with": "warn",
		"@typescript-eslint/prefer-includes": "warn",
		"@typescript-eslint/prefer-optional-chain": "warn",
		"@typescript-eslint/prefer-reduce-type-parameter": "error",
		"@typescript-eslint/require-array-sort-compare": "error",
		"@typescript-eslint/prefer-nullish-coalescing": "warn",
		"@typescript-eslint/prefer-literal-enum-member": "warn",
		"@typescript-eslint/no-invalid-void-type": "warn",
		"@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
		"@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
		"@typescript-eslint/explicit-module-boundary-types": ["error", { allowArgumentsExplicitlyTypedAsAny: true }],
		"@typescript-eslint/unbound-method": ["error", { ignoreStatic: true }],
		"no-template-curly-in-string": "warn",
		"no-unneeded-ternary": "warn",
		"yoda": "error",
		"comma-dangle": ["error", "always-multiline"],
		// "@typescript-eslint/no-magic-numbers": ["error", {
		// 	"detectObjects": true,
		// 	"enforceConst": true,
		// 	"ignoreEnums": true,
		// 	"ignoreNumericLiteralTypes": true,	//Estaria bien desactivar esto, pero probablemente sea bastante curro
		// }],

	},
	"globals": {
		"foo": "readonly",
	},
};