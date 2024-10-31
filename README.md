This is my submission for the React Native Cryptocurrency Tracker mobile challenge project for Accountable.

# Getting Started

You should write a file called .env.development with the API url like: API_URL=https://***.com
After `npm i` and doing `npx pod-install` you can run the project with `npm run start:dev` 


# TESTING
Run npm run test -- --watch to test. I use jest, @testing-library/react-native, and other jest-related packages.

# MOBX

I use Mobx and MST (mobx-state-tree) for state management. 

# MMKV

I use react-native-mmkv for caching. Noticeably faster than the async storage package.

