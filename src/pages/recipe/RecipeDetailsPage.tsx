import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../sharedComponents/Button";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { useEffect, useState } from "react";
import { Recipe, initialRecipe } from "../../model/Recipe";
import { useUserAuth } from "../../sevices/firebase/AthenicationService";
import messages from "../../data/message.json";
import { deleteRecipe, getRecipe } from "../../sevices/recipie/RecipieService";
import { LineSeperator } from "../../sharedComponents/LineSeperator";
import { Shape } from "../../sharedComponents/Shape";
import { UserCard } from "../../components/user/UserCard";
import { getUserDataByID } from "../../sevices/user/UserService";
import { User, initialUser } from "../../model/User";

export const RecipeDetailsPage = () => {
  const userAuth = useUserAuth();
  const navigate = useNavigate();

  let { id } = useParams();

  const [recipeData, setRecipeData] = useState<Recipe>(initialRecipe);
  const [userData, setUserData] = useState<User>(initialUser);

  useEffect(() => {
    const fetchRecipe = async (id: any) => {
      try {
        const recipe = await getRecipe(id);
        setRecipeData(recipe);

        console.log(recipeData.userID);
        const user = await getUserDataByID(recipeData.userID);
        setUserData(user as User);
        console.log(user);
      } catch (error) {
        console.log(messages.GET_RECIPE_ERROR_MESAGE, error);
      }
    };
    fetchRecipe(id);
  }, [id, recipeData.userID]);

  const deleteRecipeHandler = async (event: React.MouseEvent<HTMLElement>) => {
    if (
      window.confirm("Are you sure you want to delete this recipe?") === true
    ) {
      try {
        await deleteRecipe(recipeData.recipeID);
      } catch (error: any) {
        alert(messages.ERROR_IN_DELETING_RECIPIE + error);
      }
      navigate("/user/my-recipes");
    }
  };
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
        <img className="br-sm" alt="uploaded_image" src={recipeData.image} />
        <h1>{recipeData.title}</h1>
        <LineSeperator type={"horizontal"} />
        <div className="container flex-row-justify-start">
          {/* <div className="profile-avatar">
            <Avatar
              classname="avatar-profile"
              url={userData.avatar ? userData.avatar : "../../user.png"}
              name="AC"
              type={"circle"}
              size={"sm"}
            />
          </div>
          <div className="flex-align-start">
            <h5>{userData.fullname}</h5>
            <p className="text-neutral-600 fs-small-200">{userData.userName}</p>
          </div>
          <div className="ml-auto">
            {userAuth.user.uid !== state.userID && (
              <Button data_bg="google" data_type="container">
                <div className="flex-row-justify-around">
                  <p>Follow </p>
                </div>
              </Button>
            )}
          </div> */}
          <UserCard
            avatar={userData.avatar}
            fullname={userData.fullname}
            userName={userData.userName}
            type={userAuth.user.uid !== recipeData.userID ? "Follow" : "None"}
            avatarSize="sm"
            clickHandler={() => navigate("/user/edit-profile")}
          />
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
              <p>{ingredient}</p>
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
