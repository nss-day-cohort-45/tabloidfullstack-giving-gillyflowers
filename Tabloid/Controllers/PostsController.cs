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
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public PostsController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("search")]
        public IActionResult search(string q)
        {
            
            List<string> terms = q.Split(' ').ToList();

            
           return Ok(_postRepository.searchByTag(terms));
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategoryId(int categoryId)
        {
            var posts = _postRepository.GetPostByCategoryId(categoryId);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }


        [HttpGet("userProfileId/{userProfileId}")]
        public IActionResult GetPostByUserProfileId(int userProfileId)
        {
            var posts = _postRepository.GetPostByUserProfileId(userProfileId);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        // Need to update the PublishedDateTime and isApproved when we start the admin approval ticket.
        [HttpPost]
        public IActionResult AddPost(Post post)
        {
            var currentUser = GetCurrentUserProfile();
            post.UserProfileId = currentUser.Id;
            DateTime dateCreated = DateTime.Now;

            post.CreateDateTime = dateCreated;
            post.IsApproved = true;

            _postRepository.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUser = GetCurrentUserProfile();
            if (post.UserProfileId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.UpdatePost(post);
            return NoContent();
        }

        // Need to implement cascade DELETE to PostReaction, Comment, PostTag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
