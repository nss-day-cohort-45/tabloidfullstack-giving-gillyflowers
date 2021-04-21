using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet("byPost/{id}")]
        public IActionResult GetCommentsByPostId(int id)
        {
            var comments = _commentRepository.GetAllCommentsByPostId(id);
            if(comments == null)
            {
                return NotFound();
            }
            return Ok(comments);
        }

        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            var comment = _commentRepository.GetCommentById(id);
            if(comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost] 
        public IActionResult AddComment(Comment comment)
        {
            var currentUser = GetCurrentUserProfile();
            comment.UserProfileId = currentUser.Id;
            DateTime dateCreated = DateTime.Now;
            comment.CreateDateTime = dateCreated;

            _commentRepository.AddComment(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.UpdateComment(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
