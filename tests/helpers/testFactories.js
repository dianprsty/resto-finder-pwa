import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';

const createLikeButtonPresenterWithResto = async (resto) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('.btn-favorite'),
    resto,
  });
};
// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithResto };
