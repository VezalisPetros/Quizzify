import React from 'react';



export default function Settings(props) {

 

  const [options, setOptions] = React.useState([]);
  const [formData, setFormData] = React.useState(
    {
      questionCategory: "", 
      questionDifficulty: "", 
      questionType: ""
    }
)
	
	
      React.useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            .then(data => setOptions(data.trivia_categories))
            
    }, [])
    
  

    function handleSettingsChange(event) {
      const {name, value} = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    
    let apiUrl=props.apiUrl

    if (formData.questionCategory.length) {
      apiUrl = apiUrl.concat(`&category=${formData.questionCategory}`)
    }
    if (formData.questionDifficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${formData.questionDifficulty}`)
    }
    if (formData.questionType.length) {
      apiUrl = apiUrl.concat(`&type=${formData.questionType}`)
    }
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        props.updateGameQuestions(res.results)
        props.setApiUrl(apiUrl);
      });
      
      
      }
    

  

	return(
		<div className='settingsBorder'>
      <form onSubmit={handleSubmit} className='settingsForm' >
    	<h2>Select Category:</h2>
        <select value={formData.questionCategory} onChange={handleSettingsChange} name="questionCategory">
        <option>All</option>
        {options &&
              options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
        <h2>Select Difficulty:</h2>
          <select value={formData.questionDifficulty} onChange={handleSettingsChange} name ="questionDifficulty">
            <option value="" key="difficulty-0">All</option>
            <option value="easy" key="difficulty-1">Easy</option>
            <option value="medium" key="difficulty-2">Medium</option>
            <option value="hard" key="difficulty-3">Hard</option>
          </select>
        <h2>Select Question Type:</h2>
          <select value={formData.questionType} onChange={handleSettingsChange} name="questionType">
            <option value="" key="type-0">All</option>
            <option value="multiple" key="type-1">Multiple Choice</option>
            <option value="boolean" key="type-2">True/False</option>
          </select>
          
          <button className='submit-btn'>Get Started!</button>
          
          
          </form>


		
    </div>
    
	)
    
	
}

