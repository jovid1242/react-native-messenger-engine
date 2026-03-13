# Run Commands (Quick Guide)

Короткая шпаргалка по запуску проекта, чтобы не искать команды каждый раз.

## 1) Установка зависимостей

Из корня проекта:

```powershell
cd c:\dev\react-native-messenger-engine
yarn install
```

## 2) Запуск Metro (example)

```powershell
cd c:\dev\react-native-messenger-engine\example
yarn start
```

Полезно:
- Нажать `r` в терминале Metro -> reload приложения.
- Нажать `d` -> открыть Dev Menu.

## 3) Android (example)

В отдельном терминале:

```powershell
cd c:\dev\react-native-messenger-engine\example
yarn android
```

## 4) iOS (example)

```powershell
cd c:\dev\react-native-messenger-engine\example
yarn ios
```

## 5) Если порт 8081 занят

Освободить порт и заново запустить Metro:

```powershell
$conn = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue
if ($conn) { Stop-Process -Id $conn.OwningProcess -Force }

cd c:\dev\react-native-messenger-engine\example
yarn start
```

## 6) Сброс кэша Metro

```powershell
cd c:\dev\react-native-messenger-engine\example
npx react-native start --reset-cache
```

## 7) Пересобрать библиотеку (когда меняется `src/`)

Из корня проекта:

```powershell
cd c:\dev\react-native-messenger-engine
yarn prepare
```

## 8) Быстрые git-команды

```powershell
cd c:\dev\react-native-messenger-engine
git status
git add -A
git commit -m "your message"
git push origin publish-main
```

