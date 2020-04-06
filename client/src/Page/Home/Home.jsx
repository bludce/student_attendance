import React, {Fragment} from 'react';

import './Home.sass'
import Btn from '../../components/Btn/Btn';

const Home = () => (
  <Fragment>
    <div className="hero">
      <div className="hero__title">
        Добро Пожаловать!
      </div>
      <Btn name="Авторизоваться"></Btn>
    </div>
  </Fragment>
)

export default Home;