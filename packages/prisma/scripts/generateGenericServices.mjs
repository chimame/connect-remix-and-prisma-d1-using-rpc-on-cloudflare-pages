import ts from "typescript";
import fs from "node:fs/promises";
import { Prisma } from "@prisma/client";

const factory = ts.factory;

const node = ts.createSourceFile("x.ts", "", ts.ScriptTarget.Latest);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const prismaModelMethods = [
  "findUnique",
  "findUniqueOrThrow",
  "findFirst",
  "findFirstOrThrow",
  "findMany",
  "create",
  "update",
  "upsert",
  "delete",
  "createMany",
  "createManyAndReturn",
  "updateMany",
  "deleteMany",
  "count",
  "aggregate",
  "groupBy",
];

function createImport(names, from) {
  return factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports(
        names.map((name) =>
          factory.createImportSpecifier(
            false,
            undefined,
            factory.createIdentifier(name),
          ),
        ),
      ),
    ),
    factory.createStringLiteral(from),
    undefined,
  );
}

function createBaseClassAndInterface() {
  return [
    factory.createInterfaceDeclaration(
      undefined,
      factory.createIdentifier("IGenericService"),
      [
        factory.createTypeParameterDeclaration(
          undefined,
          factory.createIdentifier("T"),
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("Prisma"),
              factory.createIdentifier("ModelName"),
            ),
            undefined,
          ),
          undefined,
        ),
      ],
      undefined,
      prismaModelMethods.map((method) =>
        factory.createPropertySignature(
          undefined,
          factory.createIdentifier(method),
          undefined,
          factory.createIndexedAccessTypeNode(
            factory.createIndexedAccessTypeNode(
              factory.createTypeReferenceNode(
                factory.createIdentifier("PrismaClient"),
                undefined,
              ),
              factory.createTypeReferenceNode(
                factory.createIdentifier("Uncapitalize"),
                [
                  factory.createTypeReferenceNode(
                    factory.createIdentifier("T"),
                    undefined,
                  ),
                ],
              ),
            ),
            factory.createLiteralTypeNode(factory.createStringLiteral(method)),
          ),
        ),
      ),
    ),
    factory.createClassDeclaration(
      undefined,
      factory.createIdentifier("BaseService"),
      undefined,
      [
        factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
          factory.createExpressionWithTypeArguments(
            factory.createIdentifier("WorkerEntrypoint"),
            [
              factory.createTypeReferenceNode(
                factory.createIdentifier("Env"),
                undefined,
              ),
            ],
          ),
        ]),
      ],
      [
        factory.createPropertyDeclaration(
          [factory.createToken(ts.SyntaxKind.ProtectedKeyword)],
          factory.createIdentifier("db"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createIdentifier("PrismaClient"),
            undefined,
          ),
          undefined,
        ),
        factory.createConstructorDeclaration(
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              factory.createToken(ts.SyntaxKind.DotDotDotToken),
              factory.createIdentifier("args"),
              undefined,
              factory.createTypeReferenceNode(
                factory.createIdentifier("ConstructorParameters"),
                [
                  factory.createTypeQueryNode(
                    factory.createIdentifier("WorkerEntrypoint"),
                    [
                      factory.createTypeReferenceNode(
                        factory.createIdentifier("Env"),
                        undefined,
                      ),
                    ],
                  ),
                ],
              ),
              undefined,
            ),
          ],
          factory.createBlock(
            [
              factory.createExpressionStatement(
                factory.createCallExpression(factory.createSuper(), undefined, [
                  factory.createSpreadElement(factory.createIdentifier("args")),
                ]),
              ),
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [
                    factory.createVariableDeclaration(
                      factory.createIdentifier("adapter"),
                      undefined,
                      undefined,
                      factory.createNewExpression(
                        factory.createIdentifier("PrismaD1"),
                        undefined,
                        [
                          factory.createPropertyAccessExpression(
                            factory.createPropertyAccessExpression(
                              factory.createThis(),
                              factory.createIdentifier("env"),
                            ),
                            factory.createIdentifier("DB"),
                          ),
                        ],
                      ),
                    ),
                  ],
                  ts.NodeFlags.Const,
                ),
              ),
              factory.createExpressionStatement(
                factory.createBinaryExpression(
                  factory.createPropertyAccessExpression(
                    factory.createThis(),
                    factory.createIdentifier("db"),
                  ),
                  factory.createToken(ts.SyntaxKind.EqualsToken),
                  factory.createNewExpression(
                    factory.createIdentifier("PrismaClient"),
                    undefined,
                    [
                      factory.createObjectLiteralExpression(
                        [
                          factory.createShorthandPropertyAssignment(
                            factory.createIdentifier("adapter"),
                            undefined,
                          ),
                        ],
                        false,
                      ),
                    ],
                  ),
                ),
              ),
            ],
            true,
          ),
        ),
      ],
    ),
  ];
}

function uncapitalize(s) {
  return s[0].toLowerCase() + s.slice(1);
}

function createClassMethod(name, method) {
  return factory.createMethodDeclaration(
    undefined,
    undefined,
    factory.createIdentifier(method),
    undefined,
    undefined,
    [
      factory.createParameterDeclaration(
        undefined,
        undefined,
        factory.createIdentifier("options"),
        undefined,
        factory.createIndexedAccessTypeNode(
          factory.createTypeReferenceNode(
            factory.createIdentifier("Parameters"),
            [
              factory.createIndexedAccessTypeNode(
                factory.createIndexedAccessTypeNode(
                  factory.createTypeReferenceNode(
                    factory.createIdentifier("PrismaClient"),
                    undefined,
                  ),
                  factory.createLiteralTypeNode(
                    factory.createStringLiteral(name),
                  ),
                ),
                factory.createLiteralTypeNode(
                  factory.createStringLiteral(method),
                ),
              ),
            ],
          ),
          factory.createLiteralTypeNode(factory.createNumericLiteral("0")),
        ),
        undefined,
      ),
    ],
    undefined,
    factory.createBlock(
      [
        factory.createReturnStatement(
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createPropertyAccessExpression(
                factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier("db"),
                ),
                factory.createIdentifier(name),
              ),
              factory.createIdentifier(method),
            ),
            undefined,
            [factory.createIdentifier("options")],
          ),
        ),
      ],
      true,
    ),
  );
}

function createServiceClass(name) {
  return factory.createClassDeclaration(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(`${name}GenericService`),
    undefined,
    [
      factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
        factory.createExpressionWithTypeArguments(
          factory.createIdentifier("BaseService"),
          undefined,
        ),
      ]),
      factory.createHeritageClause(ts.SyntaxKind.ImplementsKeyword, [
        factory.createExpressionWithTypeArguments(
          factory.createIdentifier("IGenericService"),
          [factory.createLiteralTypeNode(factory.createStringLiteral(name))],
        ),
      ]),
    ],
    prismaModelMethods.map((method) =>
      factory.createGetAccessorDeclaration(
        undefined,
        factory.createIdentifier(method),
        [],
        undefined,
        factory.createBlock(
          [
            factory.createReturnStatement(
              factory.createPropertyAccessExpression(
                factory.createPropertyAccessExpression(
                  factory.createPropertyAccessExpression(
                    factory.createThis(),
                    factory.createIdentifier("db"),
                  ),
                  factory.createIdentifier(uncapitalize(name)),
                ),
                factory.createIdentifier(method),
              ),
            ),
          ],
          true,
        ),
      ),
    ),
  );
}

const result = printer.printList(
  ts.ListFormat.MultiLine,
  [
    createImport(["WorkerEntrypoint"], "cloudflare:workers"),
    createImport(["PrismaClient", "Prisma"], "@prisma/client"),
    createImport(["PrismaD1"], "@prisma/adapter-d1"),
    ...createBaseClassAndInterface(),
    ...Object.keys(Prisma.ModelName).map((name) => createServiceClass(name)),
  ],
  node,
);

await fs.writeFile(
  "src/genericServices.ts",
  `/*
 * This file is generated. Do not modify it manually.
 */

${result}`,
);
