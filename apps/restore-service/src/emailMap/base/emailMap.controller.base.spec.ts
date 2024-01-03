import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { EmailMapController } from "../emailMap.controller";
import { EmailMapService } from "../emailMap.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  box: "exampleBox",
  createdAt: new Date(),
  fullName: "exampleFullName",
  gDrive: "exampleGDrive",
  id: "exampleId",
  oneDrive: "exampleOneDrive",
  thumbNail: "exampleThumbNail",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  box: "exampleBox",
  createdAt: new Date(),
  fullName: "exampleFullName",
  gDrive: "exampleGDrive",
  id: "exampleId",
  oneDrive: "exampleOneDrive",
  thumbNail: "exampleThumbNail",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    box: "exampleBox",
    createdAt: new Date(),
    fullName: "exampleFullName",
    gDrive: "exampleGDrive",
    id: "exampleId",
    oneDrive: "exampleOneDrive",
    thumbNail: "exampleThumbNail",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  box: "exampleBox",
  createdAt: new Date(),
  fullName: "exampleFullName",
  gDrive: "exampleGDrive",
  id: "exampleId",
  oneDrive: "exampleOneDrive",
  thumbNail: "exampleThumbNail",
  updatedAt: new Date(),
};

const service = {
  createEmailMap() {
    return CREATE_RESULT;
  },
  emailMaps: () => FIND_MANY_RESULT,
  emailMap: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("EmailMap", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: EmailMapService,
          useValue: service,
        },
      ],
      controllers: [EmailMapController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /emailMaps", async () => {
    await request(app.getHttpServer())
      .post("/emailMaps")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /emailMaps", async () => {
    await request(app.getHttpServer())
      .get("/emailMaps")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /emailMaps/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/emailMaps"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /emailMaps/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/emailMaps"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /emailMaps existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/emailMaps")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/emailMaps")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
