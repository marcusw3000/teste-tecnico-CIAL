FROM cypress/included:13.12.0

RUN mkdir /testeTecnico

WORKDIR /testeTecnico

COPY ./package.json .
COPY ./cypress.json .
COPY ./cialLogo.jpg .
COPY ./ testePratico.pdf ./

RUN npm install

COPY . .

CMD ["npx", "cypress", "run"]