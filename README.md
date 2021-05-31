# qiwi

NodeJS Yoomoney API SDK

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/@kiyasov/yoomoney?maxAge=3600" alt="license mit"></a>
  <a href="https://npmjs.com/package/@kiyasov/yoomoney"><img src="https://img.shields.io/npm/v/@kiyasov/yoomoney/latest.svg?maxAge=3600" alt="open latest version"></a>
</p>

## Получаем токен https://yoomoney.ru/docs/wallet/using-api/authorization/obtain-access-token

```javascript
import Yoomoney from "@kiyasov/yoomoney";

const api = new Yoomoney(); // Токен кошелька https://yoomoney.ru/docs/wallet/using-api/authorization/obtain-access-token
```

### Метод account-info

Получение информации о состоянии счета пользователя.

Требуемые права токена: account-info

```javascript
api.accountInfo().then(data => console.log(data));
```

Ответ

```
{
  "account": "4100123456789",
  "balance": 1000.00,
  "currency": "643",
  "account_status": "anonymous",
  "account_type": "personal",
  "cards_linked": [
    {
      "pan_fragment": "510000******9999",
      "type": "MasterCard"
    }
  ]
}
```

### Метод operation-history

Метод позволяет просматривать историю операций (полностью или частично) в постраничном режиме. Записи истории выдаются в обратном хронологическом порядке: от последних к более ранним.

Требуемые права токена: operation-history.

```javascript
api.operationHistory(params).then(data => console.log(data));
```

Параметры запроса https://yoomoney.ru/docs/wallet/user-account/operation-history#request

Ответ

```
{
  "next_record": "4",
  "operations": [
    {
      "operation_id": "1234567",
      "status": "success",
      "pattern_id": "2904",
      "direction": "out",
      "amount": 500.00,
      "datetime": "2011-07-11T20:43:00.000+03:00",
      "title": "Оплата ADSL-доступа компании XXX",
      "type": "payment-shop"
    },
    {
      "operation_id": "1234568",
      "status": "success",
      "pattern_id": "2901",
      "direction": "out",
      "amount": 300.00,
      "datetime": "2011-07-10T20:43:00.000+03:00",
      "title": "Прямое пополнение счета телефона YYY",
      "type": "payment-shop"
    },
    {
      "operation_id": "1234569",
      "status": "success",
      "direction": "in",
      "amount": 1000.00,
      "datetime": "2011-07-10T20:40:00.000+03:00",
      "title": "Банк ZZZ, пополнение",
      "type": "deposit"
    }
  ]
}
```

### Метод operation-details

Позволяет получить детальную информацию об операции из истории.
Требуемые права токена: operation-details.

Параметры запроса https://yoomoney.ru/docs/wallet/user-account/operation-details#request

```javascript
api
  .operationDetails({
    operation_id: "" //Идентификатор операции. Значение параметра следует указывать как значение параметра operation_id ответа метода operation-history или значение поля payment_id ответа метода process-payment, если запрашивается история счета плательщика.
  })
  .then(data => console.log(data));
```

Ответ

```
{
  "operation_id": "1234567",
  "status": "success",
  "pattern_id": "2904",
  "amount": 500.00,
  "direction": "out",
  "datetime": "2011-07-11T20:43:00.000+04:00",
  "title": "Оплата ADSL-доступа компании Мой-Провайдер",
  "details": "Предоплата услуг ADSL-доступа в интернет компании ООО \"XXX\"\nНомер лицевого счета абонента: \n1234567/89\nЗачисленная сумма: 500.00\nНомер транзакции: 2000002967767",
  "type": "payment-shop"
}
```

### Метод request-payment

Создание платежа, проверка параметров и возможности приема платежа магазином или перевода средств на счет пользователя ЮMoney.
Требуемые права токена:
для платежа в магазин: payment.to-pattern («шаблон платежа») или payment-shop.
для перевода средств на счета других пользователей: payment.to-account («идентификатор получателя», «тип идентификатора») или payment-p2p.

Параметры запроса https://yoomoney.ru/docs/wallet/process-payments/request-payment#request

```javascript
api.requestPayment(params).then(data => console.log(data));
```

Ответ https://yoomoney.ru/docs/wallet/process-payments/request-payment#response

### Метод process-payment

Подтверждение платежа, ранее созданного методом request-payment. Указание метода проведения платежа.

Параметры запроса https://yoomoney.ru/docs/wallet/process-payments/process-payment#request

```javascript
api.processPayment(params).then(data => console.log(data));
```

Ответ https://yoomoney.ru/docs/wallet/process-payments/process-payment#response
