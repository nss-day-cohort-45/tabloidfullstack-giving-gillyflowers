using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAllUserProfiles()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("deactivated")]
        public IActionResult GetDeactivatedProfiles()
        {
            return Ok(_userProfileRepository.GetAllDeactivated());
        }

        [HttpGet("types")]
        public IActionResult GetUserTypes()
        {
            return Ok(_userProfileRepository.GetTypes());
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetByUserProfileId(id));
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpDelete("{id}")]
        public IActionResult Deactivate(int id)
        {
            int adminCount = _userProfileRepository.GetAll().Where(up => up.UserTypeId == 1).ToList().Count;
            if (adminCount > 1)
            {
                _userProfileRepository.Deactivate(id);
                return NoContent();
            } else
            {
                return BadRequest("Cannot delete the sole admin. Please elevate another user and try again.");
            }
        }

        [HttpPut("change/{id}")]
        public IActionResult Update(int id, UserProfile user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            int adminCount = _userProfileRepository.GetAll().Where(up => up.UserTypeId == 1).ToList().Count;
            if (adminCount < 2 && user.UserTypeId == 2)
            {
                return BadRequest("Cannot change role of the sole admin. Please elevate another user and try again.");
            } else
            {
                _userProfileRepository.Update(user);
                return Ok();
            }
        }

        [HttpPut("reactivate/{id}")]
        public IActionResult Reactivate(int id, UserProfile user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Reactivate(user);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
    }
}
