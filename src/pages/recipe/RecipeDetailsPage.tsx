import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../sharedComponents/Button";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { useEffect, useState } from "react";
import { Recipe, initialRecipe } from "../../model/Recipe";
import { useUserAuth } from "../../sevices/firebase/AthenicationService";
import MESSAGES from "../../data/message.json";
import { deleteRecipe, getRecipe } from "../../sevices/recipie/RecipieService";
import { LineSeperator } from "../../sharedComponents/LineSeperator";
import { Shape } from "../../sharedComponents/Shape";
import { UserCard } from "../../components/user/UserCard";
import { getUserDataByID } from "../../sevices/user/UserService";
import { User, initialUser } from "../../model/User";
import { Loading } from "../../sharedComponents/Loading";
import { bookmarkRecipe, unbookmarkRecipe, isBookmarked } from "../../sevices/recipie/BookmarkService";

export const RecipeDetailsPage = () => {
  const userAuth = useUserAuth();
  const navigate = useNavigate();
  const [bookmarkStatus, setBookmarkStatus] = useState<true | false>(true);

  let userId: string = userAuth.user.uid;
  let { id } = useParams();

  const [recipeData, setRecipeData] = useState<Recipe>(initialRecipe);
  const [userData, setUserData] = useState<User>(initialUser);

  const fetchRecipe = async (id: any) => {
    try {
      const recipe = await getRecipe(id);
      setRecipeData(recipe);
      try {
        const user = await getUserDataByID(recipeData.userID);
        setUserData(user as User);
      } catch (error) {
        console.log(MESSAGES.FETCH_USER_INFO_ERORR, error);
      }
    } catch (error) {
      console.log(MESSAGES.GET_RECIPE_ERROR_MESAGE, error);
    }
  };

  const fetchBookmarkStatus = async (userId: string, recipeId: string) => {
    const status = await isBookmarked(userId, recipeId);
    if (status) setBookmarkStatus(true);
    else setBookmarkStatus(false);
  };

  useEffect(() => {
    fetchRecipe(id);
    fetchBookmarkStatus(userId, recipeData.recipeID);
  }, [id, userId, recipeData.userID]);

  const deleteRecipeHandler = async (event: React.MouseEvent<HTMLElement>) => {
    if (
      window.confirm("Are you sure you want to delete this recipe?") === true
    ) {
      try {
        await deleteRecipe(recipeData.recipeID);
      } catch (error: any) {
        alert(MESSAGES.ERROR_IN_DELETING_RECIPIE + error);
      }
      navigate("/user/my-recipes");
    }
  };

  const bookmarkClickHandler = async (
    event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      if (bookmarkStatus) {
        await unbookmarkRecipe(userId, recipeData.recipeID);
        setBookmarkStatus(false);
      } else {
        await bookmarkRecipe(userId, recipeData.recipeID);
        setBookmarkStatus(true);
      }
    } catch (error: any) {
      alert(MESSAGES.ERROR_IN_FOLLOW_USER + error);
    }
  };



  if (!recipeData) return <Loading />;
  return (
    <>
      <Header>
        <div className="flex-row-justify-start">
          <Button
            data_type="container"
            data_bg="transparent"
            clickHandler={() => navigate(-1)}
          >
            <Icon name="back" size="lg" />
          </Button>
          {userAuth.user.uid === recipeData.userID && (
            <div className="ml-auto flex-row">
              <Button
                data_bg="google"
                data_type="container"
                clickHandler={() =>
                  navigate(`/user/recipe-edit/${recipeData.recipeID}`)
                }
              >
                <div className="flex-row-justify-around">
                  <Icon name="edit" size="xs" />
                  <p>Edit </p>
                </div>
              </Button>
              <Button
                data_bg="primary"
                data_type="container"
                clickHandler={deleteRecipeHandler}
              >
                <div className="flex-row-justify-around">
                  <Icon name="trash" size="xs" />
                  <p>Delete </p>
                </div>
              </Button>
            </div>
          )}
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <div className="bookmark-image">
          <Button
            classname="btn small-circle-button bookmark-button"
            data_type="container"
            data_bg="circle"
            clickHandler={bookmarkClickHandler}
          >
            <Icon name={bookmarkStatus ? "unbookmark" : "bookmark"} size="lg" />
          </Button>
          <img className="br-sm" alt="uploaded_image" src={recipeData.image} />
        </div>
        <h1>{recipeData.title}</h1>
        <LineSeperator type={"horizontal"} />
        <div className="container flex-row-justify-start">
          <Button
            data_type="container"
            data_bg="transparent"
            data_width="full"
            clickHandler={() =>
              navigate(`/user/user-profile/${userData.userID}`)
            }
          >
            <UserCard
              avatar={userData.avatar}
              fullname={userData.fullname}
              userName={userData.userName}
              type="None"
              avatarSize="sm"
            />
          </Button>
        </div>
        <LineSeperator type={"horizontal"} />
        <p>{recipeData.description}</p>
        <LineSeperator type={"horizontal"} />
        <div className="container flex-row-justify-around">
          <div
            className="flex-column-center br-sm bg-primary-900 pl-2 pr-2 pt-1 pb-1"
            style={{ flex: "1" }}
          >
            <h5 className="text-primary-600">{recipeData.cookTime}</h5>
            <p className="fs-small-200 text-neutral-500">cook time</p>
          </div>
          <div
            className="flex-column-center br-sm bg-primary-900 pl-2 pr-2 pt-1 pb-1"
            style={{ flex: "1" }}
          >
            <h5 className="text-primary-600">
              {recipeData.serves + " serving"}
            </h5>
            <p className="fs-small-200 text-neutral-500">serves</p>
          </div>
          <div
            className="flex-column-center br-sm bg-primary-900 pl-2 pr-2 pt-1 pb-1"
            style={{ flex: "1" }}
          >
            <h5 className="text-primary-600">{recipeData.origin}</h5>
            <p className="fs-small-200 text-neutral-500">origin</p>
          </div>
        </div>
        <LineSeperator type={"horizontal"} />

        <h3>Ingredients:</h3>
        <div>
          {recipeData.ingredients.map((ingredient, index) => (
            <div className="flex-row-justify-start pb-1" key={index}>
              <Shape type="circle">
                {" "}
                <div>{index + 1}</div>
              </Shape>
              <p className="flex-row-justify-start">{ingredient}</p>
            </div>
          ))}
        </div>
        <LineSeperator type={"horizontal"} />

        <h3>Instruments:</h3>
        <div>
          {recipeData.instructions.map((instruction, index) => (
            <div className="flex-row-justify-start pb-1" key={index}>
              <Shape type="circle">
                {" "}
                <div>{index + 1}</div>
              </Shape>
              <p>{instruction}</p>
            </div>
          ))}
        </div>
        <LineSeperator type={"horizontal"} />
      </CardBody>
    </>
  );
};
